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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
    grid-column-gap: 1em;
    align-items: center;
    height: 100%;

    li {

      width: 100%;
      text-align: center;

      .label {
        font-size: ${p=>p.theme.textSm};
      }

    }
  }
`
