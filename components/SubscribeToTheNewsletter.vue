<template>
  <div class="subscribe-to-the-newsletter p-5">
    <div>
      <h2 class="mb-4">Subscribe to the newsletter</h2>
      <p class="mb-6">Lorem ipsum dolor sit amet, consect adipiscing elit. Suspendis ultricies semper metus. Lorem ipsum dolor sit amet, consect adipiscing elit. Suspendis ultricies semper metus, id porta velit.</p>
    </div>
    <newsletter-form />
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
    font-size: var(--font-size-16);
    line-height: var(--font-size-16);
    @include media(">lg") {
      max-width: 325px;
    }
}
.subscribe-to-the-newsletter p {
    font-size: var(--font-size-6);
    line-height: var(--font-size-8);
    @include media(">lg") {
      max-width: 375px;
    }
}
.subscribe-to-the-newsletter .p-inputtext {
  background: rgba(10, 11, 12, 0.05);
  &::placeholder {
    color: var(--black100);
    opacity: .2;
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