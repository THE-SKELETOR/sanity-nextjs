import { defineType } from "sanity";

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'avatar',
            type: 'image',
            title: 'Avatar',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'bio',
            type: 'text',
            title: 'Bio'
        }
    ]
})