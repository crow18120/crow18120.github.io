using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ASM_WEB_APP.Models;

namespace ASM_WEB_APP.Controllers
{
    [Authorize]
    public class EnrollmentsController : Controller
    {
        private AsmWebAppDBEntities db = new AsmWebAppDBEntities();

        // GET: Enrollments
        public ActionResult Index()
        {
            var enrollments = db.Enrollments.Include(e => e.Course).Include(e => e.Topic).Include(e => e.Trainee);
            return View(enrollments.ToList());
        }

        // GET: Enrollments/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Enrollment enrollment = db.Enrollments.Find(id);
            if (enrollment == null)
            {
                return HttpNotFound();
            }
            return View(enrollment);
        }

        // GET: Enrollments/Create
        public ActionResult Create()
        {
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName");
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName");
            ViewBag.TraineeID = new SelectList(db.Trainees, "TraineeID", "LastName");
            return View();
        }

        // POST: Enrollments/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,CourseID,TopicID,TraineeID,Grade")] Enrollment enrollment)
        {
            if (ModelState.IsValid)
            {
                db.Enrollments.Add(enrollment);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", enrollment.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", enrollment.TopicID);
            ViewBag.TraineeID = new SelectList(db.Trainees, "TraineeID", "LastName", enrollment.TraineeID);
            return View(enrollment);
        }

        // GET: Enrollments/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Enrollment enrollment = db.Enrollments.Find(id);
            if (enrollment == null)
            {
                return HttpNotFound();
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", enrollment.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", enrollment.TopicID);
            ViewBag.TraineeID = new SelectList(db.Trainees, "TraineeID", "LastName", enrollment.TraineeID);
            return View(enrollment);
        }

        // POST: Enrollments/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,CourseID,TopicID,TraineeID,Grade")] Enrollment enrollment)
        {
            if (ModelState.IsValid)
            {
                db.Entry(enrollment).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", enrollment.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", enrollment.TopicID);
            ViewBag.TraineeID = new SelectList(db.Trainees, "TraineeID", "LastName", enrollment.TraineeID);
            return View(enrollment);
        }

        // GET: Enrollments/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Enrollment enrollment = db.Enrollments.Find(id);
            if (enrollment == null)
            {
                return HttpNotFound();
            }
            return View(enrollment);
        }

        // POST: Enrollments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Enrollment enrollment = db.Enrollments.Find(id);
            db.Enrollments.Remove(enrollment);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult AddTrainee(int courseID, int topicID)
        {
            var course = new List<Course>();
            var topic = new List<Topic>();
            course.Add(db.Courses.Find(courseID));
            topic.Add(db.Topics.Find(topicID));

            var enrollments = db.Enrollments.ToList();
            var trainees = db.Trainees.ToList();
            foreach(var e in enrollments)
            {
                if(e.CourseID == courseID && e.TopicID == topicID)
                {
                    trainees.Remove(db.Trainees.Find(e.TraineeID));
                }
            }
            ViewBag.CourseID = new SelectList(course, "CourseID", "CourseName"); 
            ViewBag.TopicID = new SelectList(topic, "TopicID", "TopicName");
            ViewBag.TraineeID = new SelectList(trainees, "TraineeID", "LastName");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddTrainee([Bind(Include = "ID,CourseID,TopicID,TraineeID,Grade")] Enrollment enrollment)
        {
            if (ModelState.IsValid)
            {
                db.Enrollments.Add(enrollment);
                db.SaveChanges();
                var ctps = db.CourseTopics.ToList();
                var id = 0;
                foreach( var ctp in ctps)
                {
                    if(ctp.CourseID ==  enrollment.CourseID && ctp.TopicID == enrollment.TopicID)
                    {
                        id = ctp.ID;
                        break;
                    }
                }
                return RedirectToAction("Details" + "/" + id.ToString(), "CourseTopics");
            }

            ViewBag.CourseID = new SelectList(db.Courses, "CourseID", "CourseName", enrollment.CourseID);
            ViewBag.TopicID = new SelectList(db.Topics, "TopicID", "TopicName", enrollment.TopicID);
            ViewBag.TraineeID = new SelectList(db.Trainees, "TraineeID", "LastName", enrollment.TraineeID);
            return View(enrollment);
        }
    }
}
