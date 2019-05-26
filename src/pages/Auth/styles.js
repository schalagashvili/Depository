import styled from 'styled-components'
// import colors from '../../styles/colors'
import sizes from '../../styles/sizes'
import bgImage from '../../assets/images/bgImage.jpg'

export const Wrapper = styled.div`
  /* background-image: url(${bgImage}); */
  background-size: cover;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MainWrapper = styled.div`
  width: 1200px;
  height: 700px;
  box-shadow: 0px 0px 63px 10px rgba(204, 200, 204, 1);
  border-radius: ${sizes.borderRadius};
  overflow: hidden;
  position: relative;
  display: flex;
`

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 10px;
  background-color: transparent;
`

export const LoginContainer = styled.div`
  background-image: linear-gradient(253deg, #3ba5b4 0, #38ba8a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 3;
`

export const InputField = styled.input`
  width: 450px;
  height: 65px;
  border: ${props => (props.borderColor ? `1px solid ${props.borderColor}` : 'none')};
  border-radius: 5px;
  outline: none;
  color: grey;
  padding: 10px 30px;
  padding-left: 70px;
  font-size: 16px;
  background-color: #f4f8f7;
  margin-top: 30px;
  &::-webkit-input-placeholder {
    color: #aaaead;
  }
`

export const Register = styled.div`
  color: white;
  margin-top: 20px;
  font-weight: bold;
  background-color: transparent;
  letter-spacing: 0.7px;
  cursor: pointer;
`

export const InputWrapper = styled.div`
  position: relative;
  background-color: transparent;
`

export const StyledButton = styled.div`
  background: #ff5a5f;
  border-radius: 35px;
  border: 0;
  color: white;
  font-size: 16px;
  height: 48px;
  text-align: center;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 0 30px;
  letter-spacing: 0.7px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.1);
  &:hover {
    cursor: pointer;
  }
`

export const UserWelcome = styled.div`
  position: absolute;
  left: 55px;
  top: 240px;
  z-index: 3;
  flex-direction: column;
  display: flex;
  opacity: 1;
`

export const WelcomeTitle = styled.div`
  color: white;
  font-weight: 900;
  font-size: 40px;
  font-family: 'NunitoExtraBold';
`

export const WelcomeText = styled.div`
  color: white;
  margin-top: 20px;
  width: 270px;
  padding-left: 10px;
  font-family: 'NunitoReg';
  text-align: center;
`

export const GuestWelcome = styled.div`
  position: absolute;
  right: -250px;
  top: 240px;
  z-index: 2;
  flex-direction: column;
  display: flex;
  text-align: center;
  opacity: 0;
`

export const Sidebar = styled.div`
  width: 400px;
  height: 100%;
  position: absolute;
  left: 0;
  z-index: 1;
`

export const SidebarButton = styled.div`
  border: 1px solid white;
  color: white;
  border-radius: 50px;
  background-color: transparent;
  padding: 15px 0;
  width: 201px;
  text-align: center;
  left: 97px;
  cursor: pointer;
  position: absolute;
  top: 400px;
  text-transform: uppercase;
`

export const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 800px;
  right: 0;
  height: 100%;
  position: absolute;
`

export const Error = styled.div`
  position: absolute;
  top: -110px;
`

export const Title = styled.div`
  font-family: 'NunitoExtraBold';
  font-size: 40px;
  color: #39b19b;
`

export const SocialMedia = styled.div`
  display: flex;
  margin-top: 25px;
  margin-bottom: 10px;
`

export const Icon = styled.div`
  position: relative;
`

export const Button = styled.div`
  margin-top: 40px;
  border-radius: 50px;
  background-image: linear-gradient(253deg, #3ba5b4 0, #38ba8a 100%);
  color: white;
  padding: 15px 70px;
  cursor: pointer;
  text-transform: uppercase;
`

export const InputIcon = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 47px;
  left: 20px;
`

export const AlternativeJoin = styled.div`
  color: #aaaead;
  margin-top: 20px;
  text-align: center;
`

export const SocialIcon = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin-left: 10px;
`
