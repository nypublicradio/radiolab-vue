import axe from './axe-helper'
import { mount } from '@vue/test-utils'
import RadiolabFooter from '../components/RadiolabFooter.vue'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

describe('Radiolab Footer', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(RadiolabFooter)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})