import { Router } from 'express'
import { verifyAcessToken } from '../../utils/auth'
import { createPost, getPosts } from './postService'

const router = Router()
router.post('/', verifyAcessToken, (req, res) => {
  try{
    const post = createPost( req.body, req.user)
    res.status(200).send(post)
    
  }catch (err) {
    res.status(500).send(err.message)
  }
  
})

router.get('/:id?', verifyAcessToken, (req, res) => {
  try {
    const posts = getPosts(req.params.id)
    res.status(200).send(posts)
  }catch (err) {
    if (err.message === 'post_nao_encontrado')
      return res.status(400).send(err.message)

    res.status(500).send(err.message)
  }
  
})

export default router