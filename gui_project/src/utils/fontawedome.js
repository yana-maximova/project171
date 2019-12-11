import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faPlus,
	faTrash,
	faEye,
	faSearchPlus,
	faSearchMinus,
	faTimesCircle,
	faTh,
	faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
	faPlus,
	faTrash,
	faEye,
	faSearchPlus,
	faSearchMinus,
	faTimesCircle,
	faTh,
	faSave)

Vue.component('font-awesome-icon', FontAwesomeIcon)
