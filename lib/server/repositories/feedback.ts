import 'server-only';

import { db } from '../db';
import { createFeedbackRepository } from './feedback-core';

export const feedbackRepository = createFeedbackRepository(db);
