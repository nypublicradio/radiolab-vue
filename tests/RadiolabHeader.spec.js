import { mount, shallowMount } from '@vue/test-utils'
import { describe, test, expect } from '@jest/globals'
import { toHaveNoViolations } from 'jest-axe'
import RadiolabHeader from '../components/RadiolabHeader.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('Radiolab Header', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(RadiolabHeader)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})