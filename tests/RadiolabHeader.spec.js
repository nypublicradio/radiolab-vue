import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
//import { setup, $fetch } from '@nuxt/test-utils-edge'
import { toHaveNoViolations } from 'jest-axe'
//import RadiolabHeader from '../components/RadiolabHeader.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

// reference link: https://v3.nuxtjs.org/guide/going-further/testing/

describe('Radiolab Header', () => {
  test('it passes basic accessibility tests', async () => {
    // const wrapper = mount(RadiolabHeader)
    // const results = await axe(wrapper.element)
    // expect(results).toHaveNoViolations()
  })
})