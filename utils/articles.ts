import { Article } from '@/types/pages'
import _ from 'lodash'

export const filterArticles = (articles?:Article[]|[], path?:string) => {
    const pathArray = path?.split('/')
    
    if (!articles && !pathArray) return []

    if ( pathArray?.includes('region') ) {
        return _.compact(_.filter(articles, (elem) => {
            return _.includes(_.get(elem, 'region'), _.chain(pathArray).dropWhile(item => item !== 'region').tail().join('-').value())
        }))
    }
    if ( pathArray?.includes('topic') ) {
        return _.compact(_.filter(articles, (elem) => {
            return _.includes(_.get(elem, 'topics'), _.chain(pathArray).dropWhile(item => item !== 'topic').tail().join('-').value())
        }))
    }
}