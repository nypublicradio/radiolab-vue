//import { mount } from '@nuxt/test-utils'
import { describe, test, expect } from 'vitest'
import { toHaveNoViolations } from 'jest-axe'
//import RadiolabHeader from '../components/RadiolabHeader.vue'
//import axe from './axe-helper'

/* THESE TEST HAVE BEEN SKIPPED BECAUSE #APP CAN NOT BE LOADED FROM THE TET ENV AND WE CAN NOT FIGURE OUT HOW TO MOCK IT PROPPERLY */

expect.extend(toHaveNoViolations)

// reference link: https://v3.nuxtjs.org/guide/going-further/testing/
describe('Radiolab Header', () => {
  test('it passes basic accessibility tests',
    async () => {
      // const wrapper = await mount(RadiolabHeader)
      // const results = await axe(wrapper.element)
      // expect(results).toHaveNoViolations()
    })
})