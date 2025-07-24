import Link from "next/link"

export default function Breadcrumb({ breadcrumbTitle }) {
    let title = breadcrumbTitle;
    if (breadcrumbTitle === 'Register') {
        title = 'Registration';
    }
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <div className="page-header-content">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="#">Pages</Link></li>
                            <li className="active">{title}</li>
                        </ul>
                    </div>
                </div>
            </section>


        </>
    )
}
