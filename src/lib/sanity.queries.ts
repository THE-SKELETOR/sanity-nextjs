import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
import { Url } from 'next/dist/shared/lib/router/router'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`

export async function getPosts(client: SanityClient): Promise<Post[]> {
  return await client.fetch(postsQuery)
}

export const postBySlugQuery = groq`*[_type == "post" && defined(slug.current) && slug.current == $slug][0] {
  ...,
"author": author-> {
    name,
    avatar
  }
}`

export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return await client.fetch(postBySlugQuery, {
    slug,
  })
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

interface Hsl {
  _type: 'hslaColor',
  h: number,
  s: number,
  l: number,
  a: number
}

interface Hsv {
  _type: 'hsvaColor',
  h: number,
  s: number,
  v: number,
  a: number
}

interface Rgb {
  _type: 'rgbaColor',
  r: number
  g: number,
  b: number,
  a: number
}

interface Color {
  _type: 'color',
  hex: string,
  alpha: number,
  hsl: Hsl
  hsv: Hsv
  rgb: Rgb
}

interface Author {
  _type: 'author',
  name: string
  avatar: ImageAsset
}

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  author: Author
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  body: PortableTextBlock[]
  tags?: string[]
  favoriteColor?: Color
}
