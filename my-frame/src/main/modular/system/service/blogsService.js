const TBlogsMapper = require('../mapper/tBlogsMapper');
const TBlogs = require('../vo/tBlogs');


class BlogsService {
    constructor() {

    }

    getList() {
        const blogList = TBlogsMapper.selectByAll();
        blogList.then(res => {
            console.log(res);
        });
    }
}

// testing
const blogsService = new BlogsService();
blogsService.getList();