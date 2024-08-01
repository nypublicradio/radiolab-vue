<script setup>
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const apiUrl = `${config.API_URL}/api/v3/channel/shows/radiolab-kids/recent_stories/`
// const apiUrl = `https://private-anon-26d14f4b2b-nyprpublisher.apiary-proxy.com/api/v3/channel/shows/radiolab-kids/recent_stories/`
</script>

<template>
  <div>
    <Html lang="en">
      <Head>
        <Title>Radiolab for Kids | Radiolab | WNYC Studios</Title>
        <Meta
          name="og:title"
          content="Radiolab for Kids | Radiolab | WNYC Studios"
        />
        <Meta
          name="og:description"
          content="Family-friendly nature stories from Terrestrials and Radiolab"
        />
        <Meta
          name="twitter:title"
          content="Radiolab for Kids | Radiolab | WNYC Studios"
        />
      </Head>
    </Html>
    <section>
      <div class="content xl:px-8 pb-0">
        <div class="grid">
          <div class="col">
            <h1 class="mb-4 h2 font-normal">Radiolab for Kids</h1>
            <p class>
              Welcome, nature lovers, to the home of the Terrestrials podcast and family-friendly Radiolab episodes about nature. Every other week, host Lulu Miller will take you on a nature walk to encounter a plant or animal behaving in ways that will surprise you. Squirrels that can regrow their brains, octopuses that can outsmart their human captors, honeybees that can predict the future. You don't have to be a kid to listen, just someone who likes to see the world anew.<br>
              <a href="https://link.chtbl.com/radiolabforkids?sid=rlkidswebsite" target="_blank" rel="noopener noreferrer">Subscribe now!</a> 
            </p>
          </div>
        </div>
      </div>
    </section>
    <episodes
      class="mb-4"
      :row-count="4"
      :api="apiUrl"
      path="data.included"
      :paginate="true"
      :kids="true"
    />
  </div>
</template>

<style lang="scss"></style>
