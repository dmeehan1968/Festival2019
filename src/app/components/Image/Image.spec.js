import React from 'react'
import { shallow } from 'enzyme'
import ReactTestRenderer from 'react-test-renderer'
import Image, { PreserveAspectRatio, BackgroundColor }  from '.'

describe('Image', () => {

  let image

  beforeAll(() => {
    image = shallow(<Image src={w=>'filename.jpg'} height={600} width={800} alt="alt text" />)
  });

  it("preserves aspect ratio", () => {
    expect(image.find(PreserveAspectRatio)).toExist()
  });

  it("shows a background color", () => {
    expect(image.find(BackgroundColor)).toExist()
  });

  it.skip("shows a low quality image", () => {
  });

  it.skip("shows a high quality image", () => {
  });

});
