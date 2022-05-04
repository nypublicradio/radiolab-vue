import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
//import { setup, $fetch } from '@nuxt/test-utils-edge'
import { toHaveNoViolations } from 'jest-axe'
import RadiolabFooter from '../components/RadiolabFooter.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

// reference link: https://v3.nuxtjs.org/guide/going-further/testing/

describe('Radiolab Footer', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(RadiolabFooter)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})