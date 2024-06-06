import React from 'react'
import { RelatedRegionTopics as RelatedRegionTopicsType  } from '@/types/components'
import { Link } from '@/components'

const RelatedRegionTopics:React.FC<RelatedRegionTopicsType> = (props:RelatedRegionTopicsType) => {
    const { region, topics, $} = props

    return( <div className={'px-8 my-16'} id='related-region-topics'>
        <div className='container mx-auto'>
            {region && region.length > 0 && <div {...$?.region}><span data-id='span-text' className='font-semibold text-sm inline-block mt-2'>Region:</span> {region.map((item:string, i:number) => 
                <span key={`region-link-${i}`}>
                    <Link url={`/articles/region/${item}`}
                        className='!text-black/50 font-montserrat border-b-2 border-transparent hover:border-black/50 cursor-pointer font-semibold text-sm capitalize'
                    >
                        {item.replaceAll('-', ' ')}
                    </Link>
                    <span className='mr-2'>{region[i+1] ? ',' : ''}</span>
                </span>               
            )}
            </div>}
            {topics && topics.length > 0 && <div {...$?.topics}><span className='font-semibold text-sm inline-block mt-2'>Topics:</span> {topics.map((item:string, i:number) => 
                <span key={`topic-link-${i}`}>
                    <Link url={`/articles/topic/${item}`}
                        className='!text-black/50 font-montserrat border-b-2 border-transparent hover:border-black/50 cursor-pointer font-semibold text-sm capitalize'
                    >
                        {item.replaceAll('-', ' ')}
                    </Link>
                    <span className=' mr-2'>{topics[i+1] ? ',' : ''}</span>
                </span>               
            )} 
            </div>}
        </div>       
    </div>)
}

export { RelatedRegionTopics }