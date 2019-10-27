import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import theme from '../../config/Theme'

export const BurgerMenu: React.FC<{
  handleNavBar: () => void
  navBarState: boolean
}> = ({ handleNavBar, navBarState }) => {
  return (
    <Wrapper onClick={handleNavBar}>
      <FontAwesomeIcon icon={navBarState ? faTimesCircle : faBars} />
    </Wrapper>
  )
}

export default BurgerMenu

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: block;
  color: ${theme.colors.grey.default};
`
