namespace BackendAPI.RequestModel
{
    public class QueryModel
    {
        public string QueryName { get; set; }
        public string QueryText { get; set; }
        public Guid DatasetId { get; set; }
    }
}
