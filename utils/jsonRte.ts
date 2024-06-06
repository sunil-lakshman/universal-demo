/* eslint-disable @typescript-eslint/no-unused-vars */
export const renderOptions = {
    img: (asset: any) => {
        return (
            `<img src=${asset?.attrs?.url} alt=${asset?.alt} />`
        )
    },
    'code': (asset: any, metadata: any) => {
        return (
            `<div className="code">${asset.children[0].text}</div>`
        )
    }
}

