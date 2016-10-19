import config from 'config';
import jwt from 'express-jwt';
import github from './github';
import drive from './drive';
import cloud from './cloud';
import tasks from './tasks';
import milestones from './milestones';

module.exports = function (express) {
  const globalRouter = express.Router();
  const auth = jwt({
    secret: config.jwt_secret,
    userProperty: 'auth'
  });

  globalRouter.use(auth);

  // GitHub Related
  // =========================================================
  globalRouter.get('/github/repos/', github.getRepositories);
  globalRouter.get('/github/commits/:commitId', github.getCommit);
  globalRouter.get('/github/commits', github.getCommits);
  globalRouter.get('/github/releases', github.getReleases);
  globalRouter.get('/github/releases/:releaseId', github.getRelease);
  globalRouter.get('/github/users', github.getParticipatingUsers);

  // Google Drive Related
  // =========================================================
  globalRouter.get('/drive/files', drive.getFiles);
  globalRouter.get('/drive/files/:fileId', drive.getFile);
  globalRouter.get('/drive/files/changes', drive.getChanges);
  globalRouter.get('/drive/files/:fileId/changes', drive.getFileChanges);
  globalRouter.get('/drive/users', drive.getParticipatingUsers);

  // Tasks Related
  // =========================================================
  globalRouter.get('/tasks', tasks.getTasks);
  globalRouter.get('/tasks/:taskId', tasks.getTask);
  globalRouter.get('/tasks/activities', tasks.getActivities);
  globalRouter.get('/tasks/:taskId/activities', tasks.getTaskActivities);
  globalRouter.get('/tasks/users', tasks.getParticipatingUsers);

  // Milestones Related
  // =========================================================
  globalRouter.get('/milestones', milestones.getMilestones);
  globalRouter.get('/milestones/:milestoneId', milestones.getMilestone);
  globalRouter.get('/milestones/activities', milestones.getActivities);
  globalRouter.get('/milestones/:milestoneId/activities', milestones.getMilestoneActivities);

  // Cloud IDE Related
  // =========================================================
  globalRouter.get('/cloud/overview', cloud.getOverview);

  return globalRouter;
};
