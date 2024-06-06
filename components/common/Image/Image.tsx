import { ImageComponent } from '@/types/components'

const Image: React.FC<ImageComponent> = (props: ImageComponent) => {
    const { image, image_alt_text, className } = props

    return <>
        {image?.url && <picture
            {...image?.$?.title}
        >
            <source media='(max-width: 475px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} />
            <source media='(min-width: 476px) and (max-width: 640px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} /> {/* xs */}
            <source media='(min-width: 641px) and (max-width: 767px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} /> {/* sm */}
            <source media='(min-width: 768px) and (max-width: 1024px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} /> {/* md */}
            <source media='(min-width: 1024px) and (max-width: 1279px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} /> {/* lg */}
            <source media='(min-width: 1280px) and (max-width: 1535px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} />{/* xl */}
            <source media='(min-width: 1536px)' srcSet={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`} />{/* 2xl */}
            <img
                src={image?.url.indexOf('?') > -1 ? `${image.url}&auto=webp&format=pjpg` : `${image.url}?auto=webp&format=pjpg`}
                alt={(image_alt_text !== undefined && image_alt_text !== '') ? image_alt_text : image?.title}
                className={className}
                data-id='image-component'
            />
        </picture>}
    </>
}

export { Image }