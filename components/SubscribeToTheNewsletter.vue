<template>
  <div class="subscribe-to-the-newsletter p-5">
    <div>
      <h2 class="mb-4">Subscribe to the newsletter</h2>
      <p class="mb-6">
        Stay in the know. Subscribe to Radiolab's weekly newsletter.
      </p>
    </div>
    <newsletter-form location="home page" />
  </div>
</template>

<style lang="scss">
.subscribe-to-the-newsletter {
  background: var(--white100);
  border-radius: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.subscribe-to-the-newsletter h2 {
  @include media('>lg') {
    max-width: 325px;
  }
}
.subscribe-to-the-newsletter p {
  line-height: var(--font-size-8);
  @include media('>lg') {
    max-width: 375px;
  }
}
.subscribe-to-the-newsletter.alone {
  h2,
  p {
    max-width: 100%;
  }
}
.subscribe-to-the-newsletter .p-inputtext {
  background: rgba(10, 11, 12, 0.05);
  &::placeholder {
    color: var(--black100);
    opacity: 0.2;
  }
  &:focus {
    border-color: var(--black100);
    box-shadow: 0 0 0 0.025rem var(--black100);
  }
}
.subscribe-to-the-newsletter .p-button {
  background: var(--black500);
  &:hover {
    background: var(--blue-500);
  }
}
.subscribe-to-the-newsletter .p-button .p-button-label {
  color: var(--white100);
}
</style>
