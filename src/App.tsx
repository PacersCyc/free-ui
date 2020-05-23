import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
// import './App.css';
import Transition from './components/Transition/transition';

library.add(fas)

function App() {
  const [show, setShow] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        {/* <FontAwesomeIcon icon={faCoffee} size="10x" /> */}
        <Icon icon="coffee" theme="primary" size="10x" />
        <Menu
          defaultIndex={'0'}
          defaultOpenSubMenus={['2']}
          // mode="vertical"
          onSelect={(index) => alert(index)}
        >
          <MenuItem>cool link1</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropDown">
            <MenuItem>drop1</MenuItem>
            <MenuItem>drop2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
          {/* <li>123</li> */}
        </Menu>

        <Button size="lg" onClick={() => setShow(!show)}>toggle</Button>

        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
        >
          <div>
            <p>111222333</p>
            <p>111222333</p>
            <p>111222333</p>
            <p>111222333</p>
          </div>
        </Transition>

        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-top"
          wrapper={true}
        >
          <Button btnType="primary">tttt</Button>
        </Transition>

        {/* <Button autoFocus onClick={() => console.log(1)}>hellow world</Button>
        <Button disabled>click me</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>click me</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">click me</Button>
        <Button btnType={ButtonType.Danger}>click me</Button> */}
      </header>
    </div>
  );
}

export default App;
