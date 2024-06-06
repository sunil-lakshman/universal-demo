import { ArticleCover, CardCollection, Image, Teaser, Text, TextAndImage } from '../components'
import { entryLocales, MappedPreview, PageEntry } from '../common'

export type SeoProps = {
  title?: string
  url?: string
  seo?: {
    title?: string
    description?: string
    canonical_url?: string
    no_follow: boolean
    no_index: boolean
  }
  summary?: string
  locale?: string
  uid?: string
  contentType?: string
  entryLocales?: entryLocales[]
}

export interface pageBlocks {
    teaser?:Teaser
    text_and_image?:TextAndImage
    text?: Text
    card_collection?:CardCollection
    image_preset?: Image
    seo?:SeoProps
    featured_articles?: any;
  }
  
export type pageRenderProps = {
    components:pageBlocks[];
  }
export interface Article extends PageEntry,ArticleCover {
  region?: string[] | [] 
  content?:string
  $?: MappedPreview<Article>
}