import Button from 'react-bootstrap/Button'
import { BsArrowRepeat } from 'react-icons/bs'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  .spinning {
    margin-right: 7px;
    top: 2px;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: scale(1) rotate(0deg);
    }
    to {
      transform: scale(1) rotate(360deg);
    }
  }
`

export default function LoaderButton ({
  isLoading, className = '', disabled = false, children, ...props
}) {
  return <StyledButton className={className} disabled={disabled || isLoading} {...props}>
    {isLoading && <BsArrowRepeat className="spinning" />}
    {children}
  </StyledButton>
}