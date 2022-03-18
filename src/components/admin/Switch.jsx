import styled from 'styled-components'

const Switch = styled.label`
  position: absolute;
  display: inline-block;
  width: 36px;
  height: 20px;
  right: 2rem;
  top: 2rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-bg-${props => props.theme.theme});
    transition: all 0.4s;
    border-radius: 15px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 4px;
    top: 3px;
    background-color: var(--color-fg-${props => props.theme.theme});
    transition: all 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--color-fg-accent-${props => props.theme.theme});
  }

  input:checked + .slider:before {
    transform: translateX(15px);
    background-color: var(--color-bg-${props => props.theme.theme}-alt);
  }
`

export default Switch
