import { shallowMount } from '@vue/test-utils'
import Top from '@/components/Top.vue'

describe('Top.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Top, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
