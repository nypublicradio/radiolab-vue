import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'
import RadiolabHeader from '../components/RadiolabHeader.vue'

expect.extend(toHaveNoViolations)

describe('Radiolab Header', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(RadiolabHeader)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})