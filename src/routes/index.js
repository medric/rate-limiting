'use strict';
const express = require('express');
const router = express.Router();

import {index} from '../controllers/main';

router.get('/', index);

module.exports = router;