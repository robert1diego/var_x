import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Layout from '../components/ui/layout'
import ProductImages from '../components/product-detail/ProductImages'
import ProductInfo from '../components/product-detail/ProductInfo'
import RecentlyViewed from '../components/product-detail/RecentlyViewed'

import { GET_DETAILS } from '../apollo/queries'



export default function ProductDetail({
    pageContext: { name, id, category, description, variants, product } }) {

    const [selectedVariant, setSelectedVariant] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)
    const [stock, setStock] = useState(null)

    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    const params = typeof window !== "undefined" ?
        new URLSearchParams(window.location.search) : { get: () => null }
    const style = params.get("style")

    const recentlyViewedProducts = typeof window !== "undefined" ?
        JSON.parse(window.localStorage.getItem('recentlyViewed')) : null

    const { error, data } = useQuery(GET_DETAILS, {
        variables: { id },
    })


    useEffect(() => {
        if (error) {
            setStock(-1)
        } else if (data) {
            setStock(data.product.variants)
        }
    }, [error, data])

    useEffect(() => {
        const styledVariant = variants.filter(
            variant => variant.style === params.get('style'))[0]

        const variantIndex = variants.indexOf(styledVariant)


        var recentlyViewed =
            JSON.parse(window.localStorage.getItem('recentlyViewed'))

        if (recentlyViewed) {
            if (recentlyViewed.length === 10) {
                recentlyViewed.shift()
            }

            if (!recentlyViewed.some(
                product =>
                    product.node.name === name &&
                    product.selectedVariant === variantIndex
            )
            ) {
                recentlyViewed.push({ ...product, selectedVariant: variantIndex })
            }

        } else {
            recentlyViewed = [{ ...product, selectedVariant: variantIndex }]
        }

        window.localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))

        setSelectedVariant(variantIndex)
    }, [style])

    return (
        <Layout>
            <Grid container direction="column">
                <Grid item container direction={matchesMD ? "column" : "row"} >
                    <ProductImages
                        images={variants[selectedVariant].images}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                    />
                    <ProductInfo
                        name={name}
                        description={description}
                        variants={variants}
                        selectedVariant={selectedVariant}
                        setSelectedVariant={setSelectedVariant}
                        stock={stock}
                        product={id}
                    />
                </Grid>
                <RecentlyViewed products={recentlyViewedProducts} />
            </Grid>
        </Layout>
    )
}