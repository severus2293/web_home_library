import {Router} from "express"
import body_parser from "body-parser"
import book from "./public/lib/lib.json" assert { type: "json" };
const router = Router()
var flag = 1;
var user;
var increment = Object.keys(book).length
router.use(body_parser.json());
router.use(body_parser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
router.get("/",(req,res,next) =>
{ res.render("index");
    flag = 1;
    next();
})
router.get('/lib',(req,res,next) => {
    // if(flag === 1) {
    //   flag = 0;
    //user = req.url.replace("/lib/?admin=", "")
    // user = req.body.admin
    //}
    res.render( "main",{books: book,userfolder: user});
    next();
});

router.post("/us",(req,res,next) => {
    if(flag === 1) {
        flag = 0;
        //user = req.url.replace("/lib/?admin=", "")
        user = req.body.admin
    }
    res.redirect("/lib")
})


router.post("/new",(req,res,next) => {
    book.push({
        "id": increment,
        "title": req.body.title,
        "author": req.body.author,
        "date": req.body.date,
        "in_library": "да",
        "person": "-",
        "date_return": "-"
    })
    increment += 1;
    res.redirect("/lib")
    next();
});

router.post("/edit/:num",(req,res,next) => {
    let id = parseInt(req.params.num);
    for (let value of book)
        if (value.id === id) {
            if (req.body.title)
                value.title = req.body.title;
            if (req.body.author)
                value.author = req.body.author;
            if (req.body.date)
                value.date = req.body.date;
        }
    res.redirect("/lib")
    next();
});

router.get('/lib/add',(req,res,next) => {
    res.render( "originbook");
    next();
});

router.get("/lib/book/:num", (req, res, next) => {
    const id = req.params.num;
    if(id === "inlib"){
        let arr = []
        book.forEach((v, i) => {
            if (v.in_library === "нет")
                arr.push(v.id)
        });
        res.end(JSON.stringify(arr));
        return;
    }
    if(id ==="allbook"){
        let arr = []
        book.forEach((v, i) => {
            arr.push(v.id)
        });
        res.end(JSON.stringify(arr));
        return;
    }
    if(id ==="duty"){
        let arr = []
        var cur_date = new Date();
        book.forEach((v, i) => {
            let date_return = new Date(v.date_return + 'T23:59:59.999Z')
            if (date_return > cur_date || v.in_library === "да") {
                arr.push(v.id);
            }
        });
        res.end(JSON.stringify(arr));
        return;
    }
    var au;
    var tit;
    var dat;
    var stat;
    var datret
    book.forEach((v, i) => {
        if (v.id === parseInt(id)){
            au = v.author
            tit = v.title
            dat = v.date
            stat = v.in_library
            datret = v.date_return
        }

    });
    res.render("originbook",{author:au,title: tit,date: dat,state: stat, bookid: id,userfolder: user,date_return: datret})
    next();
});

router.post("/book/del/:num",(req,res,next) => {
    let id = parseInt(req.params.num);
    book.forEach((v, i) => {
        if (v.id === id) {
            book.splice(i, 1);
            res.redirect("/lib");
        }
    });
    next();
});

router.post("/lib/book/get/:num",(req,res,next) => {
    let id = parseInt(req.params.num);
    book.forEach((v, i) => {
        if (v.id === id) {
            book[i].in_library = "нет"
            book[i].date_return = req.body.date_return
            res.redirect("/lib/book/" + id);
        }
    });
    next();
});


router.post("/lib/book/return/:num",(req,res,next) => {
    let id = parseInt(req.params.num);
    book.forEach((v, i) => {
        if (v.id === id) {
            book[i].in_library = "да";
            book[i].date_return = "-";
            book[i].person= "-";
            res.redirect("/lib/book/" + id);
        }
    });
    next();
});



export default router