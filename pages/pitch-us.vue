<script setup>
import VFlexibleLink from '@nypublicradio/nypr-design-system-vue3/v2/src/components/VFlexibleLink.vue'
import colors from '~/assets/scss/colors.module.scss'
useMeta({
  meta: [
    {
      name: 'theme-color',
      content: colors.rlLightblue,
    },
  ],
  bodyAttrs: {
    class: 'has-head-color',
  },
})
</script>

<template>
  <div>
    <section class="graphic-head flex justify-content-center align-content-center">
      <h2 class="text-center font-semibold">Pitch Us</h2>
    </section>
    <section>
      <div class="content thin-content-width">
        <div class="grid">
          <div class="col-12">
            <h3 class="mb-4">Have an idea for us? We'd love to hear it.</h3>
            <p class="mb-3">
              We want your ideas, your obsessions, the stories you can't stop
              telling. Don't worry about what you think does or doesn't sound
              like Radiolab. We're game for anything. The important thing is to
              bring us something that YOU can't stop thinking about. And then
              make sure that WE won't be able to stop thinking about it either.
              Infect us. Give us an itch that only you can scratch.
            </p>
            <p class="mb-3">
              That said, here are some tips about what generally works best for
              us. For starters, we tell long stories, but we love a shorter
              pitch. Try throwing something at us that's 250 words or less. What
              to pack into those words?
            </p>
            <p class="mb-3">
              1. It should be concrete. We generally don't want topics, or
              notions, or scientific studies. We want something visceral - a
              person, or a place, or an event, or a story - with real
              consequences in the real world.
            </p>
            <p class="mb-3">
              2. It needs to be surprising. Really surprising. Close your eyes
              and ask yourself, honestly, does it really surprise you? Shock
              you? Make you think things you hadn't thought before?
            </p>
            <p class="mb-3">
              3. It helps a lot if you aren't sure what to think or how to feel
              about it. It should make you, and then all of us, think hard and
              feel conflicted, at least for a while.
            </p>
            <p class="mb-6">
              4. Another question to think about is, do you have access to the
              places you want to talk about, the person you're obsessed with, or
              the voices that can tell your story and tell it well? We'll want
              you to get us inside the experience of the story.
            </p>
            <hr class="mb-6" />
            <h3 class="mb-4">Got a story to tell?</h3>
            <v-flexible-link raw to="https://forms.gle/5qPEjt11VfjNhYtH7">
              <Button class="p-button-rounded">Submit Your Pitch!!</Button>
            </v-flexible-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.pitch-us {
  .graphic-head {
    background-color: var(--lightblue-500);
    background-image: url("/rl-icon-on-blue2.svg");
  }
}
</style>