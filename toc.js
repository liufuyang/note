// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="note.html"><strong aria-hidden="true">1.</strong> Note</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="note/1.html"><strong aria-hidden="true">1.1.</strong> Example Note</a></li><li class="chapter-item expanded "><a href="note/todo.html"><strong aria-hidden="true">1.2.</strong> ToDo</a></li></ol></li><li class="chapter-item expanded "><a href="algorithms/algorithms.html"><strong aria-hidden="true">2.</strong> Algorithms</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="algorithms/1.html"><strong aria-hidden="true">2.1.</strong> Big O notations</a></li><li class="chapter-item expanded "><a href="algorithms/stack_queue.html"><strong aria-hidden="true">2.2.</strong> Stack and Queue</a></li><li class="chapter-item expanded "><a href="algorithms/devide_conquer.html"><strong aria-hidden="true">2.3.</strong> Divide and Conquer</a></li><li class="chapter-item expanded "><a href="algorithms/sort.html"><strong aria-hidden="true">2.4.</strong> Sort</a></li><li class="chapter-item expanded "><a href="algorithms/dynamic_programming.html"><strong aria-hidden="true">2.5.</strong> Dynamic programming</a></li><li class="chapter-item expanded "><a href="algorithms/a_star_search.html"><strong aria-hidden="true">2.6.</strong> A * Search homework</a></li><li class="chapter-item expanded "><a href="algorithms/binary_search_tree.html"><strong aria-hidden="true">2.7.</strong> Binary Search Tree</a></li><li class="chapter-item expanded "><a href="algorithms/balanced_search_tree.html"><strong aria-hidden="true">2.8.</strong> Balanced Search Trees</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="algorithms/balanced_search_tree/red_black_bst.html"><strong aria-hidden="true">2.8.1.</strong> Red-Black BSTs</a></li><li class="chapter-item expanded "><a href="algorithms/balanced_search_tree/b_tree.html"><strong aria-hidden="true">2.8.2.</strong> B-Trees</a></li><li class="chapter-item expanded "><a href="algorithms/balanced_search_tree/kd_tree.html"><strong aria-hidden="true">2.8.3.</strong> Kd-Trees</a></li></ol></li><li class="chapter-item expanded "><a href="algorithms/raft.html"><strong aria-hidden="true">2.9.</strong> 🪵 Raft</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> System Design</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="system_design/cache.html"><strong aria-hidden="true">3.1.</strong> Cache</a></li></ol></li><li class="chapter-item expanded "><a href="rust_note/rust.html"><strong aria-hidden="true">4.</strong> 🦀 Rust note</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> General</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="rust_note/general/cpp_memory_model.html"><strong aria-hidden="true">4.1.1.</strong> C++ memory mode</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> Note from courses</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="rust_note/courses/pattern_matching.html"><strong aria-hidden="true">4.2.1.</strong> Pattern matching</a></li><li class="chapter-item expanded "><a href="rust_note/courses/smart_pointers.html"><strong aria-hidden="true">4.2.2.</strong> Smart pointers</a></li><li class="chapter-item expanded "><a href="rust_note/courses/string.html"><strong aria-hidden="true">4.2.3.</strong> String</a></li></ol></li><li class="chapter-item expanded "><a href="rust_note/tokio.html"><strong aria-hidden="true">4.3.</strong> Note for tokio dev</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.4.</strong> Book note - Rust atomics and locks</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="rust_note/book_atomics_and_locks/spin_lock.html"><strong aria-hidden="true">4.4.1.</strong> SpinLock implementation</a></li></ol></li><li class="chapter-item expanded "><a href="rust_note/resources.html"><strong aria-hidden="true">4.5.</strong> Resources</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> Tech notes</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/network_programming.html"><strong aria-hidden="true">5.1.</strong> Network Programming</a></li><li class="chapter-item expanded "><a href="tech/java/java.html"><strong aria-hidden="true">5.2.</strong> ♨️ Java</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tech/java/scheduler.html"><strong aria-hidden="true">5.2.1.</strong> Scheduler stuff</a></li><li class="chapter-item expanded "><a href="tech/java/new_features.html"><strong aria-hidden="true">5.2.2.</strong> Some new_features learned</a></li></ol></li><li class="chapter-item expanded "><a href="tech/cli_tools.html"><strong aria-hidden="true">5.3.</strong> CLI tools</a></li></ol></li><li class="chapter-item expanded "><a href="prob_and_stats/mit_course/index.html"><strong aria-hidden="true">6.</strong> Probability and Statistics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="prob_and_stats/maths.html"><strong aria-hidden="true">6.1.</strong> Useful maths equations</a></li><li class="chapter-item expanded "><a href="prob_and_stats/mit_course/chapter_1.html"><strong aria-hidden="true">6.2.</strong> Chapter 1 &amp; 2</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.</strong> Efficiency Hack</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="efficiency/vi.html"><strong aria-hidden="true">7.1.</strong> 📝 Vi editor tips</a></li><li class="chapter-item expanded "><a href="efficiency/git.html"><strong aria-hidden="true">7.2.</strong> Git tips</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">8.</strong> Markdown Notes</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="md/md.html"><strong aria-hidden="true">8.1.</strong> Some Markdown Tips</a></li><li class="chapter-item expanded "><a href="md/details.html"><strong aria-hidden="true">8.2.</strong> &lt;details&gt; usage</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">9.</strong> Good Tips</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="sub/life_tips.html"><strong aria-hidden="true">9.1.</strong> 🧘 Life Tips</a></li><li class="chapter-item expanded "><a href="sub/career_tips.html"><strong aria-hidden="true">9.2.</strong> Career Tips</a></li><li class="chapter-item expanded "><a href="sub/HumanSystemOptimization/index.html"><strong aria-hidden="true">9.3.</strong> Human System Optimization</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">10.</strong> 📚 Book Notes</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="books/formular.html"><strong aria-hidden="true">10.1.</strong> Book Notes Formula</a></li><li class="chapter-item expanded "><a href="books/speed_read_with_right_brain.html"><strong aria-hidden="true">10.2.</strong> Speed Read with the Right Brain / Speed reading</a></li></ol></li><li class="chapter-item expanded "><a href="swedish/index.html"><strong aria-hidden="true">11.</strong> 🇸🇪 Swedish Learning</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">11.1.</strong> Grammar Summary</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="swedish/grammar/01_noun_plurals.html"><strong aria-hidden="true">11.1.1.</strong> Nouns</a></li><li class="chapter-item expanded "><a href="swedish/grammar/02_verbs.html"><strong aria-hidden="true">11.1.2.</strong> Verbs</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">11.2.</strong> Folkuniversitetet</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="swedish/folkuniversitetet/2022_A1.html"><strong aria-hidden="true">11.2.1.</strong> 2022 A1</a></li><li class="chapter-item expanded "><a href="swedish/folkuniversitetet/2022_A2.html"><strong aria-hidden="true">11.2.2.</strong> 2022 A2</a></li></ol></li><li class="chapter-item expanded "><a href="swedish/shows/huss/huss.html"><strong aria-hidden="true">11.3.</strong> TV Show - Huss</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="swedish/shows/huss/s1a1.html"><strong aria-hidden="true">11.3.1.</strong> Säsong 1 - Avsnitt 1</a></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">12.</strong> Food and Drink</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="food_and_drink/cheese.html"><strong aria-hidden="true">12.1.</strong> Cheese study</a></li><li class="chapter-item expanded "><a href="food_and_drink/stockholm_restaurants.html"><strong aria-hidden="true">12.2.</strong> Restaurants in Stockholm</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">13.</strong> Random thoughts</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="random/learning_and_memory.html"><strong aria-hidden="true">13.1.</strong> About learning and memory</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
