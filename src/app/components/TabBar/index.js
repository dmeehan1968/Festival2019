import React from 'react'
import styled from 'styled-components'

export const TabBarItem = ({
  icon,
  label,
}) => {
  return (
    <>
      {icon}
      <div className="label">{label}</div>
    </>
  )
}

export const TabBar = ({
  className,
  children,
  ...props,
}) => {
  return (
    <nav className={className}>
      <ul>
        {React.Children.map(children, (child, key) => (<li key={key}>{child}</li>))}
      </ul>
    </nav>
  )
}

export default styled(TabBar)`
  background-color: ${p=>p.theme.colorWhite};
  border-top: 1px solid gray;
  width: 100vw;
  height: ${p=>p.theme.footerHeight};

  ul {

    list-style-type: none;
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;

    li {

      width: 100%;
      padding: 0 ${p=>p.theme.spaceXs};
      text-align: center;

      a {
        display: inline-block;
        padding: 0 ${p=>p.theme.spaceSm};
      }

      .label {
        font-size: ${p=>p.theme.textSm};
      }

    }
  }
`
