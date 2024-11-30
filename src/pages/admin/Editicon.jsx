const EditIcon = () => {
    const { id } = useParams();
    const [icon, setIcon] = useState({
        name: '',
        image: ''
    });
    const api = ENV.BASE_URL;

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIconData = async () => {
            try {
                const response = await axios.get(`${api}icons/${id}`);
                setIcon(response.data);
            } catch (error) {
                console.error('Error fetching icon:', error);
                setErrorMessage('Failed to fetch icon data');
            }
            setLoading(false);
        };

        fetchIconData();
    }, [id]);

    const handleChange = (e) => {
        setIcon({ ...icon, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setIcon({ ...icon, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('name', icon.name);
            if (icon.image) {
                form.append('image', icon.image);
            }
            await axios.put(`${api}icons/${id}`, form);
            setSuccessMessage('Icon updated successfully');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/admin/icons');
            }, 2000);
        } catch (error) {
            console.error('Error updating icon:', error);
            setErrorMessage('Failed to update icon');
        }
    };

    return (
        <>
            <AdminHeader />
            <div className='container-fluid bg-light dashboard'>
                <div className="row">
                    <AdminSidebar />
                    <main className='col-md ms-sm-auto px-md-4'>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Edit Icon</h1>
                        </div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" className="form-control" name='name' value={icon.name} onChange={handleChange} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Image</label>
                                            <input type="file" className="form-control" name='image' accept='.png, .jpg, .jpeg' onChange={handlePhoto} />
                                        </div>
                                        <button type='submit' className="btn btn-success">Update</button>
                                    </form>
                                    {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default EditIcon;
