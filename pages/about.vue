<script setup>
useMeta({
  bodyAttrs: {
    class: 'has-head-color',
  },
})
</script>

<template>
  <div>
    <section>
      <div class="content">
        <div class="grid">
          <div class="col-12">
            <h1 class="page-header">About Radiolab</h1>
            <p class="mb-3">
              Radiolab is on a curiosity bender. We ask deep questions and use
              investigative journalism to get the answers. A given episode might
              whirl you through science, legal history, and into the home of someone
              halfway across the world. The show is known for innovative sound
              design, smashing information into music. It is hosted by Jad Abumrad,
              Lulu Miller, and Latif Nasser.
            </p>
            <p class="mb-3">
              Radiolab is available on Apple, Spotify, Stitcher, or wherever you get
              your podcasts. Check your local station for airtimes. It's also
              available via the CBC, ABC, and the BBC.
            </p>
            <p class="mb-3">
              Contact Radiolab using
              <a
                href="https://wnycstudios.zendesk.com/hc/en-us/requests/new?ticket_form_id=923428"
                target="_blank"
                rel="noopener noreferrer"
              >this form.</a>
            </p>
            <p class="mb-3">Embed the Radiolab widget on your blog or website:</p>
            <textarea class="mb-3" rows="6">
<iframe frameborder='0' height='180' src="https://www.wnyc.org/widgets/bucket_player/#slotname=radiolab-bucket-player-episodes" mce_src="https://www.wnyc.org/widgets/bucket_player/#slotname=radiolab-bucket-player-episodes" width='300px'></iframe></textarea>
            <p class="mb-3">
              All press inquiries may be directed to
              <a
                href="mailto:jhoulihan@nypublicradio.org"
              >Jennifer Houlihan Roussel</a>
              at (646) 829-4497.
            </p>
            <p class="mb-3">
              Please read about changes to our comments policy
              <nuxt-link to="/comments">here</nuxt-link>.
            </p>
            <p class="mb-3">
              <em>
                Radiolab is supported in part by Science Sandbox a Simons
                Foundation initiative dedicated to engaging everyone with the
                process of science. Additional leadership support is provided by the
                Gordon and Betty Moore Foundation, fostering path-breaking
                scientific discover; the Shanahan Family Charitable Foundation; The
                Smart Family Fund; and the John Templeton Foundation.
              </em>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.about textarea {
  padding: 1rem;
  width: 100%;
  max-width: 500px;
}
</style>
