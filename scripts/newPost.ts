import Twitter, { AccessTokenOptions } from 'twitter'
import { filter, first, last } from 'lodash'
import http from 'http'
import fs, { promises as fsPromises } from 'fs'
import { generateSlug } from '../src/utils/paths'
import moment from 'moment'

const main = async () => {
  const args = process.argv
  if (args.length < 3) {
    console.error('You gotta supply a title.')
    return process.exit(1)
  }
  const title = last(args) as string
  const slug = generateSlug(title)
  const today = moment()
  const date = today.format('YYYY-MM-DD')
  const postPath = `${date}-${slug}`

  const {
    TWITTER_CONSUMER_KEY: consumer_key,
    TWITTER_CONSUMER_SECRET: consumer_secret,
    TWITTER_ACCESS_TOKEN: access_token_key,
    TWITTER_ACCESS_SECRET: access_token_secret
  } = process.env

  const client = new Twitter({
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret
  } as AccessTokenOptions)

  const favourites = (await client.get('favorites/list', {
    count: 100,
    include_entities: true
  })) as Tweet[]
  const filtered = filter(favourites, r =>
    ['CloudyConway', 'CrookedCosmos'].includes(r.user.screen_name)
  )
  // Grab the latest favourited tweet, or a first from CloudyConway
  const tweet =
    first(filtered) ||
    first((await client.get('statuses/user_timeline', {
      screen_name: 'CloudyConway',
      include_entities: true,
      count: 1
    })) as Tweet[])

  if (tweet) {
    const media = first(tweet.entities.media)

    await fsPromises.mkdir(`blog/${postPath}`, { recursive: true })
    const file = fs.createWriteStream(`blog/${postPath}/background.png`)
    if (media) {
      http.get(media.media_url, response => response.pipe(file))
    }
    const bannnerAttribution = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    const post = `---
title: ${title}
date: ${date}
banner: background.jpg
bannerAttribution: ${bannnerAttribution}
---

${title}
`
    fsPromises.writeFile(`blog/${postPath}/index.mdx`, post, {
      encoding: 'utf8'
    })
  }
}

interface Tweet {
  user: {
    screen_name: string
  }
  id_str: string
  entities: {
    media: {
      media_url: string
    }[]
  }
}

main()
