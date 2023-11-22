// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusConstants = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
  loading: 'Loading',
}
class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coverageList: [],
    genderList: [],
    ageList: [],
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formated7days = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      const formatedbyAge = data.vaccination_by_age.map(each => ({
        age: each.age,
        count: each.count,
      }))
      const formatedbyGender = data.vaccination_by_gender.map(each => ({
        count: each.count,
        gender: each.gender,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        genderList: formatedbyGender,
        ageList: formatedbyAge,
        coverageList: formated7days,
      })
      const {apiStatus, ageList, genderList, coverageList} = this.state
      console.log('kiran', apiStatus, ageList, genderList, coverageList)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-view-image"
      />
    </div>
  )

  renderSuccessView = () => {
    const {coverageList, genderList, ageList} = this.state
    return (
      <>
        <div className="container">
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage coverageList={coverageList} />
        </div>
        <div className="container">
          <h1>Vaccination by gender</h1>
          <VaccinationByGender genderList={genderList} />
        </div>
        <div className="container">
          <h1>Vaccination by Age</h1>
          <VaccinationByAge ageList={ageList} />
        </div>
      </>
    )
  }

  renderingGraphs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <div className="logo-heading-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="heading">Co-WIN Vaccination in India</h1>
        {this.renderingGraphs()}
      </div>
    )
  }
}

export default CowinDashboard
