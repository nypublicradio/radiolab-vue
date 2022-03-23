<template>
  <div class="newsletter">
    <div class="grid">
      <div :class="`col-12 left lg:pr-8`">
        <h2>Sign up for the newsletter</h2>
      </div>
      <div :class="`col-12 right w-100 mt-4`">
        <newsletter-form />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.newsletter {
  .left {
    .icon {
      width: 45px;
      height: auto;
      vertical-align: middle;
    }
  }
  .right {
    .field {
      margin-bottom: 0;
      * {
        display: block;
      }
    }
  }
}
</style>
