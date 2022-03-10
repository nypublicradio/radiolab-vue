import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import axe from './axe-helper'
import RadiolabFooter from '../components/RadiolabFooter.vue'

expect.extend(toHaveNoViolations)

describe('Radiolab Footer', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(RadiolabFooter)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})