import React from 'react'
import { shallow } from 'enzyme'
import CookieNotice, { Notice, Dismiss, PolicyLink } from './CookieNotice'

describe("CookieNotice", () => {

  let wrapper

  it("exists", () => {
    expect(CookieNotice).toBeDefined()
  });

  it("forwards className", () => {
    wrapper = shallow(<CookieNotice className="test" />)
    expect(wrapper.find('.test')).toExist()
  });

  describe("notice text", () => {

    it("has a default notice text", () => {
      wrapper = shallow(<CookieNotice />)
      const notice = wrapper.find(Notice)
      expect(notice).toExist()
      expect(notice.children().text()).toMatch(/This website uses cookies to enhance the user experience\./)
    });

    it("allows notice text to be replaced", () => {
      const expected = 'My Replacement Notice Text'
      wrapper = shallow(<CookieNotice notice={expected} />)
      const notice = wrapper.find(Notice)
      expect(notice).toExist()
      expect(notice.children().text()).toEqual(expected)
    });

  });

  describe("privacy policy", () => {

    it("passes undefined to PolicyLink if policy undefined", () => {
      wrapper = shallow(<CookieNotice />)
      const policyLink = wrapper.find(PolicyLink)
      expect(policyLink).toExist()
      expect(policyLink.prop('href')).toBeUndefined()
    });

    it("has a default privacy policy link", () => {
      const expected = "http://example.com/privacy"
      wrapper = shallow(<CookieNotice policy={expected} />)
      const policyLink = wrapper.find(PolicyLink)
      expect(policyLink).toExist()
      expect(policyLink.prop('href')).toEqual(expected)
      expect(policyLink.children().text()).toMatch(/Read our privacy policy\./)
    });

    it("customises policy text if passed", () => {
      const expected = "New policy Text"
      wrapper = shallow(<CookieNotice policy="test" policyText={expected} />)
      const policyLink = wrapper.find(PolicyLink)
      expect(policyLink).toExist()
      expect(policyLink.children().text()).toEqual(expected)
    });

  });

  describe("without onDismiss", () => {

    it("Dismiss is passed undefined", () => {
      wrapper = shallow(<CookieNotice />)
      expect(wrapper.find(Dismiss).prop('onDismiss')).toBeUndefined()
    });

  });

  describe("with onDismiss", () => {

    let onDismiss
    let control

    beforeEach(() => {
      onDismiss = jest.fn()
      wrapper = shallow(<CookieNotice onDismiss={onDismiss} />)
      control = wrapper.find(Dismiss)
    });

    it("has a button", () => {
      expect(control).toExist()
    });

    it("passes the supplied callback", () => {
      expect(control.prop('onDismiss')).toEqual(onDismiss)
    });

    it("has default Dismiss text", () => {
      expect(control.children().text()).toEqual('Dismiss')
    });

  });

  describe("with dismissText", () => {

    let control

    beforeEach(() => {
      wrapper = shallow(<CookieNotice onDismiss={()=>{}} dismissText="Ok" />)
      control = wrapper.find(Dismiss)
    });

    it("has a button", () => {
      expect(control).toExist()
    });

    it("passes supplied dismissText", () => {
      expect(control.children().text()).toEqual('Ok')
    });
  });

});
