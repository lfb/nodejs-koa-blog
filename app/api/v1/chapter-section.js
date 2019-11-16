const Router = require('koa-router');

const {
  ChapterSectionValidator,
  PositiveChapterIdParamsValidator,
  PositiveIdParamsValidator
} = require('../../validators/chapter-section');

const {Auth} = require('../../../middlewares/auth');
const {CommentDao} = require('../../dao/comment');
const {ChapterSectionDao} = require('../../dao/chapter-section');

const {Resolve} = require('../../lib/helper');
const res = new Resolve();

const AUTH_ADMIN = 16;

const router = new Router({
  prefix: '/v1'
})

/**
 * 创建专栏文章
 */
router.post('/chapter/section', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new ChapterSectionValidator().validate(ctx);

  // 创建专栏章节
  await ChapterSectionDao.create(v);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.success('创建专栏文章成功');
});

/**
 * 删除专栏文章
 */
router.delete('/chapter/section/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏文章ID参数
  const id = v.get('path.id');
  // 删除专栏
  await ChapterSectionDao.destroy(id);

  ctx.response.status = 200;
  ctx.body = res.success('删除专栏文章成功');
})

/**
 * 更新专栏文章
 */
router.put('/chapter/section/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 更新专栏章节
  await ChapterSectionDao.update(id, v);

  ctx.response.status = 200;
  ctx.body = res.success('更新专栏文章成功');
})


/**
 * 获取专栏文章列表
 */
router.get('/chapter/section-list/:column_chapter_id', async (ctx) => {
  // 通过验证器校验参数是否通过
  const v = await new PositiveChapterIdParamsValidator().validate(ctx);
  // 查询专栏章节列表
  const chapterSectionList = await ChapterSectionDao.list(v.get('path.column_chapter_id'));

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(chapterSectionList);
});

/**
 * 查询专栏文章详情
 */
router.get('/chapter/section/:id', async (ctx) => {

  // 通过验证器校验参数是否通过
  const v = await new PositiveIdParamsValidator().validate(ctx);

  // 获取专栏ID参数
  const id = v.get('path.id');
  // 查询章节目
  const chapterSection = await ChapterSectionDao.detail(id);

  // 获取关联此章节目的评论列表
  const commentList = await CommentDao.targetComment({
    target_id: id,
    target_type: 'column',
    page: 1
  });
  await chapterSection.setDataValue('section_comment', commentList);

  // 返回结果
  ctx.response.status = 200;
  ctx.body = res.json(chapterSection);

})

module.exports = router
