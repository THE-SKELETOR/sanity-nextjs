import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
import post from '~/schemas/post'
import { rgbaColor } from '@sanity/color-input'
import { Icon } from '@iconify/react';

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current
  })
  console.log(post.author.avatar)
  console.log(post.mainImage)
  console.log(post.favoriteColor)
  return (
    <Container>
      <section className="post">
        {post.mainImage ? (
          <Image
            className="post__cover"
            src={urlForImage(post.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="post__cover--none" style={{
            background: post.favoriteColor.hex
          }}/>
        )}
        <div className="post__container">
          <h1 className="post__title">{post.title}</h1>
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
              <div />
          )}
            <p>{post.author.name}</p></div>
          <p className="post__date"></p>
          <p className="post__date">{formatDate(post._createdAt)}</p>
          <p className="post__excerpt">{post.excerpt}</p>
          <div className="post__content">
            <PortableText value={post.body} components={{
              types: {
                "iconWithText": (props) => 
                {
                  return (
                    <>
                      <Icon icon={props.value.myIcon.name} />
                      <p>
                        {props.value.text}
                      </p>
                      <Image src={urlForImage(props.value.icon).url()} alt='' width={400} height={225}></Image>
                    </>
                  )
                },
                "importantText": (props) => 
                {
                  return(
                    <p className='important-text'>{props.value.text}</p>
                  )
                }
              }
            }} />
          </div>
          <div className="post__tags">{post.tags?.map((tag) => (
            <p key={tag}>{tag}, </p>
          ))}</div>
        </div>
      </section>
    </Container>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}
