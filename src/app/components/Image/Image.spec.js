import React from 'react'
import { shallow } from 'enzyme'
import 'jest-styled-components'
import ReactTestRenderer from 'react-test-renderer'
import Image from '.'

describe('Image', () => {

  let image

  beforeAll(() => {
    image = shallow(<Image src={w=>'filename.jpg'} height={600} width={800} alt="alt text" />)
  });

  it("preserves aspect ratio", () => {
    expect(image.find('PreserveAspectRatio')).toHaveLength(1)
  });

  it("shows a background color", () => {
    expect(image.find('BackgroundColor')).toHaveLength(1)
  });

  it.skip("shows a low quality image", () => {
  });

  it.skip("shows a high quality image", () => {
  });

});
