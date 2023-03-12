import { bindActionCreators } from 'redux'
import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import './Navigation.scss';
import ibmlogo from './ibmlogo.svg'
import { Information, Trophy } from '@carbon/icons-react'
import {

  StructuredListHead,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  HeaderPanel,
  HeaderMenuItem,
  Header,
  HeaderContainer,
  Theme,
  HeaderName,
  HeaderGlobalBar,
  HeaderNavigation,
  SkipToContent,
  HeaderMenuButton,

  HeaderGlobalAction,

} from '@carbon/react';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'added_file': null,
      'selectedIndex': 0
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <Theme theme={"g60"}>
        <HeaderContainer

          render={({ isSideNavExpanded, onClickSideNavExpand }) => (

            <Header className="header-background" aria-label="IBM Platform Name">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />

              <HeaderName href="#" prefix="">
                <img style={{ height: '60px' }} src={ibmlogo} />

                IPA Challenge
              </HeaderName>

              <HeaderNavigation aria-label="IBM [Platform]" >
                <Link to="/task1" style={{ textDecoration: 'none', display: 'inherit' }}><HeaderMenuItem isCurrentPage={this.props.current_index == 0} href="#">Beginner</HeaderMenuItem></Link>
                <Link to="/task2" style={{ textDecoration: 'none', display: 'inherit' }}><HeaderMenuItem isCurrentPage={this.props.current_index == 1} href="#">Advanced</HeaderMenuItem></Link>
                <Link to="/task3" style={{ textDecoration: 'none', display: 'inherit' }}><HeaderMenuItem isCurrentPage={this.props.current_index == 2} href="#">Pro</HeaderMenuItem></Link>
                <Link to="/task4" style={{ textDecoration: 'none', display: 'inherit' }}><HeaderMenuItem isCurrentPage={this.props.current_index == 3} href="#">Pro Max</HeaderMenuItem></Link>

                {/* <HeaderMenu aria-label="Link 4" menuLinkName="Link 4">
                <HeaderMenuItem href="#one">Sub-link 1</HeaderMenuItem>
                <HeaderMenuItem href="#two">Sub-link 2</HeaderMenuItem>
                <HeaderMenuItem href="#three">Sub-link 3</HeaderMenuItem>
              </HeaderMenu> */}
              </HeaderNavigation>
              <HeaderGlobalBar>



                <HeaderGlobalAction
                  aria-label="Leaderboards"
                  isActive
                  onClick={() => { }}>
                  <Trophy size={20} />
                </HeaderGlobalAction>

              </HeaderGlobalBar>
              <HeaderPanel className="side-panel-leaderboards" aria-label="Header Panel" expanded>


                <StructuredListWrapper>
                  <StructuredListHead>
                    <StructuredListRow head>
                      < StructuredListCell head>Position</StructuredListCell>
                      <StructuredListCell head>Name</StructuredListCell>
                      <StructuredListCell head>Score</StructuredListCell>
                    </StructuredListRow>
                  </StructuredListHead>
                  <StructuredListBody>
                    <StructuredListRow>
                      <StructuredListCell className="center-text bold-text">
                        1
                      </StructuredListCell>
                      <StructuredListCell noWrap>TheRpaKing</StructuredListCell>
                      <StructuredListCell  className="center-text">
                        99999
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell className="center-text bold-text">
                        2
                      </StructuredListCell>
                      <StructuredListCell noWrap>AutomationFacade</StructuredListCell>
                      <StructuredListCell  className="center-text">
                        9992
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell className="center-text bold-text">
                        3
                      </StructuredListCell>
                      <StructuredListCell noWrap>RpaPsycho</StructuredListCell>
                      <StructuredListCell  className="center-text">
                        8834
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell className="center-text bold-text">
                        4
                      </StructuredListCell>
                      <StructuredListCell noWrap>AutomationSlasher</StructuredListCell>
                      <StructuredListCell  className="center-text">
                        8834
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell className="center-text bold-text">
                        5
                      </StructuredListCell>
                      <StructuredListCell noWrap>RPA_Zero</StructuredListCell>
                      <StructuredListCell  className="center-text">
                        8831
                      </StructuredListCell>
                    </StructuredListRow>
                    <StructuredListRow>
                      <StructuredListCell className="center-text bold-text">
                        6
                      </StructuredListCell>
                      <StructuredListCell noWrap>Dr_RPA</StructuredListCell>
                      <StructuredListCell  className="center-text">
                        4777
                      </StructuredListCell>
                    </StructuredListRow>



                  </StructuredListBody>
                </StructuredListWrapper>
              </HeaderPanel>
            </Header>)} /></Theme>




    )
  }
}
const mapStateToProps = (state) => {
  console.log("state: ", state)
  return {
    ...state,
    played_data: state.mqttReducer.played_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
