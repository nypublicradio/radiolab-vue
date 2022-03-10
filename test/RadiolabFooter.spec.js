import { mount } from '@vue/test-utils'
import { toHaveNoViolations } from 'jest-axe'
import RadiolabFooter from '../components/RadiolabFooter.vue'
import axe from './axe-helper'

expect.extend(toHaveNoViolations)

describe('Radiolab Footer', () => {
  test('it passes basic accessibility tests', async () => {
    const wrapper = mount(RadiolabFooter)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})