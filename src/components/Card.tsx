import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function Card({ post }: { post: Post }) {
  console.log(post.slug.current)
  return (
    
    <div className="card">
      {post.mainImage ? (
        <Image
          className="card__cover"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="card__cover--none" style={{
          background: post.favoriteColor.hex
        }}/>
      )}
      <div className="card__container">
        <h3 className="card__title" id='beeg'>
          <a className="card__link" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <div className="post__author">
            {post.author.avatar ? (
              <Image
                className=""
                src={urlForImage(post.author.avatar).url()}
                height={60}
                width={60}
                alt=""
              />
            ) : (
              <div className="post__cover--none" />
          )}
            <p>{post.author.name}</p></div>
        <p className="card__excerpt">{post.excerpt}</p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}
