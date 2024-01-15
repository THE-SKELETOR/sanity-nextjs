import Image from 'next/image'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils'

export default function SecondaryCard({ post }: { post: Post }) {
  return (
    <div className="secondaryCard card">
      {post.mainImage ? (
        <Image
          className="secondaryCard__cover"
          src={urlForImage(post.mainImage).width(500).height(300).url()}
          height={300}
          width={500}
          alt=""
        />
      ) : (
        <div className="secondaryCard__cover--none" style={{
            background: post.favoriteColor.hex
          }} />
      )}
      <div className="card__container">
        <h3 className="card__title">
          <a className="card__link" href={`/post/${post.slug.current}`}>
            {post.title}
          </a>
        </h3>
        <p className="card__excerpt"></p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  )
}
